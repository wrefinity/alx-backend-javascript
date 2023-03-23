import ClassRoom from './0-classroom';

/**
 * Make an array of {@link ClassRoom}s with defined size.
 * @returns An array of {@link ClassRoom}s.
 */
export default function initializeRooms() {
  return [19, 20, 34].map((cls) => new ClassRoom(cls));
}
