function InvestmentCards() {
  return (
    <div className="flex gap-[16px] h-[212px] items-center justify-center relative shrink-0 w-full z-[4]">
      {/* Sitios Fijos Card - Active */}
      <div className="basis-0 bg-[#f1f4ff] border-2 border-[#e1ebf9] border-solid grow min-h-px min-w-px relative rounded-[9px] shrink-0">
        <div className="box-border flex flex-col gap-[10px] items-center overflow-clip px-[13px] py-[22px] relative rounded-[inherit] w-full">
          <div className="box-border flex gap-[10px] items-center justify-center pb-[8px] pt-0 px-0 relative shrink-0">
            <div className="h-[22px] relative shrink-0 w-[24px]">
              <img alt="" className="block max-w-none size-full" src="/4ac2374c1fa6d628f35c270db8759200a77abd6c.svg" />
            </div>
            <p className="font-semibold h-[22px] leading-[normal] relative shrink-0 text-[#252525] text-[16px] w-[145px]">
              Sitios Fijos: 51.40%
            </p>
          </div>
          <div className="relative shrink-0">
            <div className="h-[70.222px] relative w-[144px]">
              <img alt="" className="block max-w-none size-full" src="/4c4f6e81ce1d5a0fbf9e40cc79e833caf12ad9f1.svg" />
            </div>
            <div className="flex h-[14.574px] items-center justify-center ml-[102.92px] mt-[48.45px] relative w-[9.236px]">
              <div className="flex-none h-[6.738px] rotate-[78.783deg] skew-x-[0.082deg] w-[13.512px]">
                <img alt="" className="block max-w-none size-full" src="/4d6c09364bce3f0a30b1a7d4abb4cfd82455b886.png" />
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[45px] mt-[39px] place-items-start relative">
              <div className="ml-0 mt-0 relative size-[49px]">
                <img alt="" className="block max-w-none size-full" src="/4dcac69ac10f0752fec468c2937852d1a7f8b3cb.svg" />
              </div>
            </div>
          </div>
          <div className="flex gap-[10px] items-center justify-center relative shrink-0 w-[296px]">
            <div className="flex flex-col font-semibold h-[27px] justify-center leading-[0] relative shrink-0 text-[#3658c1] text-center w-[272px]">
              <p className="leading-[normal] text-[16px]">
                <span className="font-semibold text-[#4f4f4f]">Inversión Mensual:</span>
                <span className="font-semibold text-[#131313]"> </span>$598,797.35
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Camiones Urbanos Card */}
      <div className="basis-0 bg-neutral-50 border-2 border-[#e1ebf9] border-solid grow h-[211px] min-h-px min-w-px opacity-50 relative rounded-[9px] shrink-0">
        <div className="box-border flex flex-col gap-[10px] h-[211px] items-center overflow-clip px-[13px] py-[22px] relative rounded-[inherit] w-full">
          <div className="box-border flex gap-[10px] items-center justify-center pb-[8px] pt-0 px-0 relative shrink-0">
            <div className="relative shrink-0 size-[27px]">
              <img alt="" className="block max-w-none size-full" src="/4e2b6c5a7efe7986a4633b1fafb7910494f3f564.svg" />
            </div>
            <p className="font-semibold h-[22px] leading-[normal] relative shrink-0 text-[#252525] text-[16px] w-[215px]">
              Camiones Urbanos: 0%
            </p>
          </div>
          <div className="relative shrink-0">
            <div className="h-[70.222px] relative w-[144px]">
              <img alt="" className="block max-w-none size-full" src="/4c4f6e81ce1d5a0fbf9e40cc79e833caf12ad9f1.svg" />
            </div>
            <div className="flex h-[14.574px] items-center justify-center ml-[102.92px] mt-[48.45px] relative w-[9.236px]">
              <div className="flex-none h-[6.738px] rotate-[78.783deg] skew-x-[0.082deg] w-[13.512px]">
                <img alt="" className="block max-w-none size-full" src="/4d6c09364bce3f0a30b1a7d4abb4cfd82455b886.png" />
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[45px] mt-[39px] place-items-start relative">
              <div className="ml-0 mt-0 relative size-[49px]">
                <img alt="" className="block max-w-none size-full" src="/4dcac69ac10f0752fec468c2937852d1a7f8b3cb.svg" />
              </div>
            </div>
          </div>
          <div className="flex gap-[10px] items-center justify-center relative shrink-0 w-[296px]">
            <div className="flex flex-col font-semibold h-[27px] justify-center leading-[0] relative shrink-0 text-[#3658c1] text-center w-[272px]">
              <p className="leading-[normal] text-[16px]">
                <span className="font-semibold text-[#4f4f4f]">{`Inversión Mensual: `}</span>$0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Medios Indoor Card */}
      <div className="basis-0 bg-neutral-50 border-2 border-[#e1ebf9] border-solid grow h-[211px] min-h-px min-w-px opacity-50 relative rounded-[9px] shrink-0">
        <div className="box-border flex flex-col gap-[10px] h-[211px] items-center overflow-clip px-[13px] py-[22px] relative rounded-[inherit] w-full">
          <div className="box-border flex gap-[10px] items-center justify-center pb-[8px] pt-0 px-0 relative shrink-0">
            <div className="relative shrink-0 size-[27px]">
              <img alt="" className="block max-w-none size-full" src="/4e97af2013e326ae9ad33a8fcc7a2948ad6ace2c.svg" />
            </div>
            <p className="font-semibold h-[22px] leading-[normal] relative shrink-0 text-[#252525] text-[16px] w-[145px]">
              Medios Indoor: 0%
            </p>
          </div>
          <div className="relative shrink-0">
            <div className="h-[70.222px] relative w-[144px]">
              <img alt="" className="block max-w-none size-full" src="/4c4f6e81ce1d5a0fbf9e40cc79e833caf12ad9f1.svg" />
            </div>
            <div className="flex h-[14.574px] items-center justify-center ml-[102.92px] mt-[48.45px] relative w-[9.236px]">
              <div className="flex-none h-[6.738px] rotate-[78.783deg] skew-x-[0.082deg] w-[13.512px]">
                <img alt="" className="block max-w-none size-full" src="/4d6c09364bce3f0a30b1a7d4abb4cfd82455b886.png" />
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[45px] mt-[39px] place-items-start relative">
              <div className="ml-0 mt-0 relative size-[49px]">
                <img alt="" className="block max-w-none size-full" src="/4dcac69ac10f0752fec468c2937852d1a7f8b3cb.svg" />
              </div>
            </div>
          </div>
          <div className="flex gap-[10px] items-center justify-center relative shrink-0 w-[296px]">
            <div className="flex flex-col font-semibold h-[27px] justify-center leading-[0] relative shrink-0 text-[#3658c1] text-center w-[272px]">
              <p className="leading-[normal] text-[16px]">
                <span className="font-semibold text-[#4f4f4f]">{`Inversión Mensual: `}</span>$0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vallas Móviles Card */}
      <div className="basis-0 bg-neutral-50 border-2 border-[#e1ebf9] border-solid grow h-[211px] min-h-px min-w-px opacity-50 relative rounded-[9px] shrink-0">
        <div className="box-border flex flex-col gap-[10px] h-[211px] items-center overflow-clip px-[13px] py-[22px] relative rounded-[inherit] w-full">
          <div className="box-border flex gap-[10px] items-center justify-center pb-[8px] pt-0 px-0 relative shrink-0">
            <div className="h-[28px] relative shrink-0 w-[29px]">
              <img alt="" className="block max-w-none size-full" src="/4fd2bb5d96b7ca39967da26027631f8d697d23f5.svg" />
            </div>
            <p className="font-semibold h-[22px] leading-[normal] relative shrink-0 text-[#252525] text-[16px] w-[145px]">
              Vallas Móviles: 0%
            </p>
          </div>
          <div className="relative shrink-0">
            <div className="h-[70.222px] relative w-[144px]">
              <img alt="" className="block max-w-none size-full" src="/4c4f6e81ce1d5a0fbf9e40cc79e833caf12ad9f1.svg" />
            </div>
            <div className="flex h-[14.574px] items-center justify-center ml-[102.92px] mt-[48.45px] relative w-[9.236px]">
              <div className="flex-none h-[6.738px] rotate-[78.783deg] skew-x-[0.082deg] w-[13.512px]">
                <img alt="" className="block max-w-none size-full" src="/4d6c09364bce3f0a30b1a7d4abb4cfd82455b886.png" />
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[45px] mt-[39px] place-items-start relative">
              <div className="ml-0 mt-0 relative size-[49px]">
                <img alt="" className="block max-w-none size-full" src="/4dcac69ac10f0752fec468c2937852d1a7f8b3cb.svg" />
              </div>
            </div>
          </div>
          <div className="flex gap-[10px] items-center justify-center relative shrink-0 w-[296px]">
            <div className="flex flex-col font-semibold h-[27px] justify-center leading-[0] relative shrink-0 text-[#3658c1] text-center w-[272px]">
              <p className="leading-[normal] text-[16px]">
                <span className="font-semibold text-[#4f4f4f]">Inversión Mensual:</span>
                <span className="font-semibold text-[#131313]"> </span>$0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentCards

