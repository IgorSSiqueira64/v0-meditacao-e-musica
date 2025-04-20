import { PremiumLock } from "@/components/premium/premium-lock"

export function FrequencySelectorPreview() {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 opacity-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-medium text-white">Transformação</h4>
            <p className="text-xs text-[#a0a0b0]">Reparação e harmonia</p>
          </div>
          <div className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            528 Hz
          </div>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full mb-4"></div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          {[396, 528, 639].map((freq) => (
            <div
              key={freq}
              className="rounded-full text-xs px-2 py-1 h-auto text-center bg-white/5 border-white/10 text-[#a0a0b0]"
            >
              {freq} Hz
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <PremiumLock
          title="Frequências Premium"
          description="Desbloqueie o acesso a frequências sonoras específicas que influenciam as ondas cerebrais e induzem estados mentais específicos."
          className="w-full max-w-[90%] bg-transparent"
        />
      </div>
    </div>
  )
}
