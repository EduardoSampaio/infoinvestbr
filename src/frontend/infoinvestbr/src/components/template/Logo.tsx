import Image from "next/image";

export default function Logo() {
  return (
  <div className="flex">
      <Image src="/img/logo-light.png" className="h-14 -mt-2 dark:bg-gray-800 bg-gray-100" height="85" width="85" alt="Logo" />
  </div>
  )
}
