function MediaList() {
  return (
    <div className="flex flex-col gap-[16px] items-start overflow-clip relative shrink-0">
      {/* Selected Media Card */}
      <div className="bg-[#f2fff9] border-2 border-[#039b59] border-solid relative rounded-[8px] self-stretch shrink-0">
        <div className="box-border flex flex-col h-full items-center justify-between overflow-clip px-[12px] py-[13px] relative rounded-[inherit]">
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <div className="bg-neutral-50 border border-[#929292] border-solid rounded-[2px] shrink-0 size-[16px]" />
            <div className="flex flex-col items-start relative shrink-0">
              <div className="bg-[#22c55e] box-border flex flex-col gap-[0px] h-[20px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[8px] shrink-0">
                <div className="box-border flex gap-[4px] items-center justify-center p-[0px] relative shrink-0">
                  <div className="box-border flex items-center justify-center p-[0px] relative shrink-0">
                    <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 size-[10px] text-[10px] text-white text-center">
                      <p className="leading-[normal]">✓</p>
                    </div>
                  </div>
                  <p className="font-semibold leading-[17.5px] relative shrink-0 text-white text-[12px] text-nowrap tracking-[0.5px] whitespace-pre">
                    Exclusivo
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 flex flex-col gap-[16px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
            <p className="font-semibold leading-[normal] min-w-full relative shrink-0 text-[#4f4f4f] text-[13px] text-center w-[min-content]">
              Pantalla Digital
            </p>
            <div className="flex gap-[10px] items-center justify-center relative shrink-0 w-full">
              <p className="font-bold leading-[normal] relative shrink-0 text-[#252525] text-[16px] text-nowrap whitespace-pre">
                IMJ-CDMX-XXX-X-XXXXX
              </p>
            </div>
            <div className="flex gap-[7px] items-center justify-center relative shrink-0">
              <div className="relative shrink-0 size-[19.062px]">
                <img alt="" className="block max-w-none size-full" src="/53aaf24793cef5c95e5a8aede3e78e5fe68f36db.svg" />
              </div>
              <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#3658c1] text-[13px] text-center text-nowrap">
                <p className="leading-[normal] whitespace-pre">Ver detalles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Media Card - Partial */}
      <div className="bg-[#f2fff9] border-2 border-[#039b59] border-solid relative rounded-[8px] self-stretch shrink-0">
        <div className="box-border flex flex-col h-full items-center justify-between overflow-clip px-[12px] py-[13px] relative rounded-[inherit]">
          <div className="flex items-center relative shrink-0 w-full">
            <div className="bg-neutral-50 border border-[#929292] border-solid rounded-[2px] shrink-0 size-[16px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaList

