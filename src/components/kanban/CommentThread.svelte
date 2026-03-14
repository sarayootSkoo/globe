<script lang="ts">
  import { cardComments, addCardComment, removeCardComment } from '../../lib/stores/kanbanState';
  import type { CardComment } from '../../lib/types';

  interface Props {
    cardId: string;
  }

  let { cardId }: Props = $props();

  let newText = $state('');

  // Bridge Svelte 4 writable store into Svelte 5 $state
  let allComments = $state<Record<string, CardComment[]>>({});
  $effect(() => {
    const unsub = cardComments.subscribe(v => { allComments = v; });
    return unsub;
  });

  let comments = $derived<CardComment[]>(allComments[cardId] ?? []);

  function formatRelativeTime(ts: number): string {
    const now = Date.now();
    const diff = now - ts;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    const date = new Date(ts);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  function authorBadgeColor(author: string): string {
    if (author === 'user') return '#3b82f6';
    if (author === 'system') return '#6b7280';
    if (author.startsWith('agent:')) return '#a855f7';
    return '#6b7280';
  }

  function authorLabel(author: string): string {
    if (author === 'user') return 'U';
    if (author === 'system') return 'S';
    if (author.startsWith('agent:')) return author.slice(6, 8).toUpperCase();
    return '?';
  }

  function handlePost(): void {
    const text = newText.trim();
    if (!text) return;
    addCardComment(cardId, text, 'user');
    newText = '';
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  }

  function handleDelete(commentId: string): void {
    removeCardComment(cardId, commentId);
  }
</script>

<div class="comment-thread">
  <div class="comment-header">Comments ({comments.length})</div>

  <div class="comment-list">
    {#each comments as comment (comment.id)}
      <div class="comment-item">
        <div class="comment-meta">
          <span class="author-badge" style="background:{authorBadgeColor(comment.author)}">
            {authorLabel(comment.author)}
          </span>
          <span class="author-name">{comment.author}</span>
          <span class="comment-time">{formatRelativeTime(comment.createdAt)}</span>
          {#if comment.editedAt}
            <span class="comment-edited">(edited)</span>
          {/if}
          <button class="delete-btn" onclick={() => handleDelete(comment.id)} title="Delete comment">&times;</button>
        </div>
        <div class="comment-text">{comment.text}</div>
      </div>
    {/each}

    {#if comments.length === 0}
      <div class="comment-empty">No comments yet</div>
    {/if}
  </div>

  <div class="comment-input-row">
    <input
      type="text"
      class="comment-input"
      placeholder="Write a comment..."
      bind:value={newText}
      onkeydown={handleKeydown}
    />
    <button class="post-btn" onclick={handlePost} disabled={!newText.trim()}>Post</button>
  </div>
</div>

<style>
  .comment-thread {
    background: #161922;
    border: 1px solid #2a2f3a;
    border-radius: 6px;
    padding: 8px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .comment-header {
    font-size: 11px;
    font-weight: 600;
    color: #cbd5e1;
    padding: 2px 4px;
    border-bottom: 1px solid #2a2f3a;
    padding-bottom: 6px;
  }

  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 240px;
    overflow-y: auto;
    padding-right: 2px;
  }

  .comment-list::-webkit-scrollbar {
    width: 4px;
  }

  .comment-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .comment-list::-webkit-scrollbar-thumb {
    background: #2a2f3a;
    border-radius: 2px;
  }

  .comment-item {
    padding: 4px 6px;
    border-radius: 4px;
    background: #1e2230;
    border: 1px solid #252a36;
  }

  .comment-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    color: #64748b;
    margin-bottom: 3px;
  }

  .author-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    font-size: 8px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }

  .author-name {
    color: #94a3b8;
    font-weight: 500;
  }

  .comment-time {
    color: #475569;
  }

  .comment-edited {
    color: #475569;
    font-style: italic;
  }

  .delete-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: #475569;
    font-size: 13px;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
  }

  .comment-item:hover .delete-btn {
    opacity: 1;
  }

  .delete-btn:hover {
    color: #ef4444;
  }

  .comment-text {
    font-size: 11px;
    color: #e2e8f0;
    line-height: 1.5;
    padding-left: 22px;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .comment-empty {
    font-size: 10px;
    color: #475569;
    text-align: center;
    padding: 12px 0;
    font-style: italic;
  }

  .comment-input-row {
    display: flex;
    gap: 4px;
    border-top: 1px solid #2a2f3a;
    padding-top: 6px;
  }

  .comment-input {
    flex: 1;
    background: #1a1e2a;
    border: 1px solid #2a2f3a;
    border-radius: 4px;
    padding: 5px 8px;
    font-size: 11px;
    font-family: inherit;
    color: #e2e8f0;
    outline: none;
    transition: border-color 0.15s;
  }

  .comment-input::placeholder {
    color: #475569;
  }

  .comment-input:focus {
    border-color: #3b82f6;
  }

  .post-btn {
    background: #3b82f6;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 10px;
    font-family: inherit;
    font-weight: 600;
    padding: 4px 10px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .post-btn:hover:not(:disabled) {
    background: #2563eb;
  }

  .post-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }
</style>
