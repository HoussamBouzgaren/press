// Utility function to format dates with English numbers
export function formatDateArabic(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const formatted = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Convert to Arabic but keep English numbers
  return formatted
    .replace("January", "يناير")
    .replace("February", "فبراير")
    .replace("March", "مارس")
    .replace("April", "أبريل")
    .replace("May", "مايو")
    .replace("June", "يونيو")
    .replace("July", "يوليو")
    .replace("August", "أغسطس")
    .replace("September", "سبتمبر")
    .replace("October", "أكتوبر")
    .replace("November", "نوفمبر")
    .replace("December", "ديسمبر")
}

export function formatDateTimeArabic(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const dateFormatted = formatDateArabic(dateObj)
  const timeFormatted = dateObj
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace("AM", "ص")
    .replace("PM", "م")

  return `${dateFormatted} في ${timeFormatted}`
}

export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}
