// Générateur de fichiers audio Tikar
export class TikarAudioGenerator {
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

  // Générer un fichier audio pour un mot Tikar
  async generateWordAudio(word, pronunciation, duration = 2) {
    if (!this.audioContext) await this.init()

    const bufferLength = this.sampleRate * duration
    const buffer = this.audioContext.createBuffer(1, bufferLength, this.sampleRate)
    const data = buffer.getChannelData(0)

    // Créer un son vocal plus réaliste
    for (let i = 0; i < bufferLength; i++) {
      const time = i / this.sampleRate
      
      // Fréquence de base selon le mot (plus grave pour simuler la voix)
      let baseFreq = this.getWordFrequency(word)
      
      // Créer un son vocal avec formants (comme la voix humaine)
      let sample = 0
      
      // Formant 1 (fondamental) - 200-800 Hz
      const formant1 = baseFreq * 1.5
      const formant1Gain = 0.8
      sample += formant1Gain * Math.sin(2 * Math.PI * formant1 * time) * this.getEnvelope(time, duration)
      
      // Formant 2 (voyelle) - 800-2000 Hz
      const formant2 = baseFreq * 3.5
      const formant2Gain = 0.4
      sample += formant2Gain * Math.sin(2 * Math.PI * formant2 * time) * this.getEnvelope(time, duration)
      
      // Formant 3 (consonnes) - 2000-4000 Hz
      const formant3 = baseFreq * 7
      const formant3Gain = 0.2
      sample += formant3Gain * Math.sin(2 * Math.PI * formant3 * time) * this.getEnvelope(time, duration)
      
      // Ajouter un léger vibrato pour simuler la voix
      const vibrato = Math.sin(2 * Math.PI * 5 * time) * 0.1
      sample *= (1 + vibrato)
      
      // Appliquer un filtre passe-bas pour adoucir
      sample = this.applyLowPassFilter(sample, time)
      
      data[i] = sample * 0.2 // Volume réduit
    }

    return buffer
  }

  // Fréquences spécifiques pour chaque mot Tikar
  getWordFrequency(word) {
    const frequencies = {
      'Mbèn': 180,  // Grave, salutation respectueuse
      'Nde': 200,   // Merci, politesse
      'Nkum': 220,  // Au revoir, familial
      'Mba': 240,   // Eau, nature
      'Ntum': 200,  // Terre, ami
      'Nkeng': 190, // Père, respect
      'Nkum': 210,  // Famille, arbre
      'Mba': 230    // Enfant, rivière
    }
    return frequencies[word] || 200
  }

  // Enveloppe ADSR pour un son naturel
  getEnvelope(time, duration) {
    const attack = 0.1
    const decay = 0.2
    const sustain = 0.6
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

  // Filtre passe-bas pour adoucir le son
  applyLowPassFilter(sample, time) {
    // Simulation simple d'un filtre passe-bas
    const cutoff = 0.8
    return sample * cutoff
  }

  // Convertir le buffer en blob audio
  async bufferToBlob(buffer, type = 'audio/wav') {
    const wavBuffer = this.bufferToWav(buffer)
    return new Blob([wavBuffer], { type })
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

  // Générer et télécharger un fichier audio
  async generateAndDownload(word, pronunciation) {
    try {
      const buffer = await this.generateWordAudio(word, pronunciation)
      const blob = await this.bufferToBlob(buffer)
      
      // Créer un lien de téléchargement
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${word.toLowerCase()}-${pronunciation}.wav`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      return blob
    } catch (error) {
      console.error('Erreur lors de la génération audio:', error)
      throw error
    }
  }
}

// Instance globale
export const tikarAudioGenerator = new TikarAudioGenerator()
