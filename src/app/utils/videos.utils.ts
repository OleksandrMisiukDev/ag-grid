import { Item } from '../services/videos.interfaces';
import { VideoGridRowItem } from '../shared/video-grid-row-item.interface';

export function mapItemsToVideos(items: Item[]): VideoGridRowItem[] {
  return items.map((item) => {
    const { id, snippet } = item;
    const { description, title, publishedAt, thumbnails } = snippet;
    const { default: thumbnail } = thumbnails;
    return { id, description, title, publishedAt: new Date(publishedAt).toDateString(), thumbnail: thumbnail.url };
  });
}
