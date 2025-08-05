"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const MEDIA = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80",
    type: "image"
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80",
    type: "image"
  },
  {
    id: "vid1",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "video"
  },
  {
    id: "aud1",
    url: "https://www.soundjay.com/buttons/sounds/button-3.mp3",
    type: "audio"
  }
];

const MediaItemList = ({ type, onSelect }) => {
  const items = MEDIA.filter(item => item.type === type);
  return (
    <div className="grid grid-cols-2 gap-3 my-2">
      {items.map(item => (
        <Button
          key={item.id}
          variant="ghost"
          className="p-0 aspect-square flex-col items-center"
          onClick={() => onSelect(type, item.url)}
        >
          {type === "image" && <img src={item.url} alt="" className="w-24 h-24 object-cover rounded" />}
          {type === "video" && (
            <video src={item.url} controls className="w-24 h-24 rounded bg-black" />
          )}
          {type === "audio" && (
            <div className="flex items-center justify-center w-24 h-24">
              <audio controls src={item.url} className="w-full" />
            </div>
          )}
          <span className="block mt-1 truncate text-xs max-w-[90px]">{item.url.slice(-22)}</span>
        </Button>
      ))}
      {items.length === 0 && (
        <div className="col-span-2 text-center text-gray-400 text-sm">
          No media items found.
        </div>
      )}
    </div>  
  );
};

export default MediaItemList;
