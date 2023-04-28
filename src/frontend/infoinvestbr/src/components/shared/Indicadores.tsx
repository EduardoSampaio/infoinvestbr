import BoxIndicador from "./BoxIndicador"

interface IndicadoresProps {
    titulo: string
    children: any
}

export default function Indicadores(props: IndicadoresProps) {
    return(
        <div
        className={`flex flex-col h-auto
            rounded-xl border-2 mt-5 
            dark:border-gray-600
            w-full
            `}
      >
        <div className={`w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-t-lg`}>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-white m-2.5">
            {props.titulo}
          </h3>
        </div>
        <div className="w-full flex flex-wrap">
            {props.children}
        </div>    
      </div>
    )
}