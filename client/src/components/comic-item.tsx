"use client"

import Image from "next/image"
import { Button } from "./button"
import { LuBookmark } from "react-icons/lu"
import { useState } from "react"
import { cn } from "@/utils"

export default function ComicItem({
  title,
  image,
  date,
  characters
}: {
  title?: string
  isBookmarked?: boolean
  bookmarkHandler?: () => void
  image: string
  date?: string
  characters: string[]
}) {
  const characterLength = characters.length
  const characterPlural = characterLength == 1 ? "character" : "characters"

  const stackedCharImg = characters.slice(0, 3)

  // TODO: move this to react context once API is done
  const [hasBookmarked, setBookmark] = useState(false)

  // TODO: this is temporary, for prototype purposes
  const bookmarkHandler = () => {
    setBookmark(!hasBookmarked)
  }

  const _date = new Date(date as string)
  const parsedDate = _date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })

  return (
    <div id="comic-item" className="flex flex-col p-1.5 gap-y-2">
      {/* Title card */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </div>
        <Button
          onClick={bookmarkHandler}
          className={cn(
            "p-2",
            !hasBookmarked ? "" : "bg-purple-500 hover:bg-purple-600 text-white"
          )}
          variant="tritery"
          icon={<LuBookmark size={19} />}
        />
      </div>
      {/* Image */}
      <div className="relative overflow-hidden rounded-md size-full aspect-[15/12.5]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover select-none"
          draggable={false}
        />
      </div>
      {/* Details for Character, date, and arcs */}
      <div className="flex items-center gap-x-2">
        {/* Character button */}
        <div className="flex-1">
          <Button variant="tritery" className="hover:bg-purple-100 group py-1">
            <div className="flex items-center gap-x-1">
              <span className="inline-flex ml-2.5 group-hover:[&_div]:border-purple-100 [&_div]:transition-colors">
                {stackedCharImg.map((e, i) => (
                  <div
                    key={i}
                    className="relative size-7 border-2 border-white rounded-full -ml-2.5 overflow-hidden"
                  >
                    <Image
                      src="/placeholder.png"
                      fill
                      alt=""
                      className="object-cover"
                      quality={70}
                      priority
                      fetchPriority="high"
                    />
                  </div>
                ))}
              </span>
              <span>{`${characterLength} ${characterPlural}`}</span>
            </div>
          </Button>
        </div>
        {/* Data */}
        <time dateTime={_date.toISOString()}>{parsedDate}</time>
      </div>
    </div>
  )
}
