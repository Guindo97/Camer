// Générateur de sons audio plus réalistes pour Tikar
export class RealAudioGenerator {
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

  // Créer un son vocal plus réaliste
  async generateVocalSound(word, pronunciation, duration = 1.5) {
    if (!this.audioContext) await this.init()

    const bufferLength = this.sampleRate * duration
    const buffer = this.audioContext.createBuffer(1, bufferLength, this.sampleRate)
    const data = buffer.getChannelData(0)

    // Créer un son vocal avec des formants réalistes
    for (let i = 0; i < bufferLength; i++) {
      const time = i / this.sampleRate
      
      // Fréquence fondamentale (voix masculine)
      const fundamentalFreq = this.getVoiceFrequency(word)
      
      // Créer un son vocal avec plusieurs formants
      let sample = 0
      
      // Formant 1 (fondamental) - 100-300 Hz
      const f1 = fundamentalFreq
      const f1Gain = 0.9
      sample += f1Gain * Math.sin(2 * Math.PI * f1 * time) * this.getVocalEnvelope(time, duration)
      
      // Formant 2 (voyelle) - 500-1500 Hz
      const f2 = fundamentalFreq * 2.5
      const f2Gain = 0.6
      sample += f2Gain * Math.sin(2 * Math.PI * f2 * time) * this.getVocalEnvelope(time, duration)
      
      // Formant 3 (consonnes) - 1500-3000 Hz
      const f3 = fundamentalFreq * 5
      const f3Gain = 0.3
      sample += f3Gain * Math.sin(2 * Math.PI * f3 * time) * this.getVocalEnvelope(time, duration)
      
      // Ajouter un léger vibrato naturel
      const vibrato = Math.sin(2 * Math.PI * 4.5 * time) * 0.05
      sample *= (1 + vibrato)
      
      // Appliquer un filtre passe-bas pour adoucir
      sample = this.applyVocalFilter(sample, time)
      
      data[i] = sample * 0.15 // Volume réduit
    }

    return buffer
  }

  // Fréquences vocales selon le mot
  getVoiceFrequency(word) {
    const voiceFreqs = {
      'Mbèn': 120,  // Grave, respectueux
      'Nde': 130,   // Merci, poli
      'Nkum': 140,  // Familial
      'Mba': 150,   // Nature
      'Ntum': 135,  // Terre, ami
      'Nkeng': 125  // Père, respect
    }
    return voiceFreqs[word] || 130
  }

  // Enveloppe vocale naturelle
  getVocalEnvelope(time, duration) {
    const attack = 0.05
    const decay = 0.1
    const sustain = 0.7
    const release = 0.3

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

  // Filtre vocal pour adoucir
  applyVocalFilter(sample, time) {
    // Simulation d'un filtre vocal
    const cutoff = 0.7
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
      const buffer = await this.generateVocalSound(word, pronunciation)
      const wavBuffer = this.bufferToWav(buffer)
      return new Blob([wavBuffer], { type: 'audio/wav' })
    } catch (error) {
      console.error('Erreur lors de la génération audio:', error)
      throw error
    }
  }
}

// Instance globale
export const realAudioGenerator = new RealAudioGenerator()
