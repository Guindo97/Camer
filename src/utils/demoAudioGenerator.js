// Générateur de sons de démonstration pour Tikar
export class DemoAudioGenerator {
  constructor() {
    this.audioContext = null
    this.sampleRate = 44100
  }

  async init() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  // Créer un son de démonstration plus approprié
  async generateDemoSound(word, pronunciation, duration = 1.2) {
    if (!this.audioContext) await this.init()

    const bufferLength = this.sampleRate * duration
    const buffer = this.audioContext.createBuffer(1, bufferLength, this.sampleRate)
    const data = buffer.getChannelData(0)

    // Créer un son de démonstration plus doux
    for (let i = 0; i < bufferLength; i++) {
      const time = i / this.sampleRate
      
      // Fréquence de base selon le mot
      const baseFreq = this.getDemoFrequency(word)
      
      // Créer un son plus doux et naturel
      let sample = 0
      
      // Son principal (plus doux)
      const mainFreq = baseFreq
      const mainGain = 0.6
      sample += mainGain * Math.sin(2 * Math.PI * mainFreq * time) * this.getDemoEnvelope(time, duration)
      
      // Harmonique douce
      const harmonicFreq = baseFreq * 1.5
      const harmonicGain = 0.3
      sample += harmonicGain * Math.sin(2 * Math.PI * harmonicFreq * time) * this.getDemoEnvelope(time, duration)
      
      // Ajouter un léger vibrato doux
      const vibrato = Math.sin(2 * Math.PI * 3 * time) * 0.03
      sample *= (1 + vibrato)
      
      // Appliquer un filtre doux
      sample = this.applyDemoFilter(sample, time)
      
      data[i] = sample * 0.1 // Volume très réduit
    }

    return buffer
  }

  // Fréquences de démonstration plus douces
  getDemoFrequency(word) {
    const demoFreqs = {
      'Mbèn': 200,  // Plus doux
      'Nde': 220,   // Plus doux
      'Nkum': 240,  // Plus doux
      'Mba': 260,   // Plus doux
      'Ntum': 230,  // Plus doux
      'Nkeng': 210  // Plus doux
    }
    return demoFreqs[word] || 220
  }

  // Enveloppe de démonstration plus douce
  getDemoEnvelope(time, duration) {
    const attack = 0.1
    const decay = 0.2
    const sustain = 0.5
    const release = 0.4

    if (time < attack) {
      return time / attack
    } else if (time < attack + decay) {
      return 1 - (time - attack) / decay * (1 - sustain)
    } else if (time < duration - release) {
      return sustain
    } else {
      return sustain * (duration - time) / release
    }
  }

  // Filtre de démonstration plus doux
  applyDemoFilter(sample, time) {
    const cutoff = 0.8
    return sample * cutoff
  }

  // Convertir en format WAV
  bufferToWav(buffer) {
    const length = buffer.length
    const arrayBuffer = new ArrayBuffer(44 + length * 2)
    const view = new DataView(arrayBuffer)

    // En-tête WAV
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }

    writeString(0, 'RIFF')
    view.setUint32(4, 36 + length * 2, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, 1, true)
    view.setUint32(24, this.sampleRate, true)
    view.setUint32(28, this.sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, length * 2, true)

    // Données audio
    const channelData = buffer.getChannelData(0)
    let offset = 44
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
      offset += 2
    }

    return arrayBuffer
  }

  // Générer et retourner un blob audio
  async generateAudioBlob(word, pronunciation) {
    try {
      const buffer = await this.generateDemoSound(word, pronunciation)
      const wavBuffer = this.bufferToWav(buffer)
      return new Blob([wavBuffer], { type: 'audio/wav' })
    } catch (error) {
      console.error('Erreur lors de la génération audio:', error)
      throw error
    }
  }
}

// Instance globale
export const demoAudioGenerator = new DemoAudioGenerator()
