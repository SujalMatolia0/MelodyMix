import { z } from 'zod';

export class TrackZod {
 public static $Id = z.string().min(1).max(50);
 public static $Title = z.string().min(1).max(100);
 public static $Artist = z.string().min(1).max(100);
 public static $Image = z.string().min(1).max(1000);
 public static $Source = z.string().min(1).max(1000);
 public static $Length = z.number().min(1)
 public static $type = z.enum(['public', 'private']);

 public static New = z.object({
    title: this.$Title,
    artist: this.$Artist,
    image: this.$Image,
    source: this.$Source,
    type: this.$type,
    length: this.$Length
 });

 public static Like = z.object({
   songId: this.$Id
 })
}

export type TrackNew = z.infer<typeof TrackZod.New>;