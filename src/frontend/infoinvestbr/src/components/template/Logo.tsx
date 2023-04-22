import Image from "next/image";

export default function Logo() {
  return (
  <div className="flex">
      <Image src="/img/logo-light.png" className="h-14 -mt-2 w-20 lg:ml-12 md:ml-12" height="85" width="85" alt="Logo" />
  </div>
  )
}
