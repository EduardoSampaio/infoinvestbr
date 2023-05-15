import Image from "next/image";

export default function Logo() {
  return (
  <div className="flex">
      <Image src="/img/logo-light.png" priority className="h-14 -mt-2 mr-5 ml-5" height="85" width="85" alt="Logo" />
  </div>
  )
}
