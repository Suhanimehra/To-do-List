// File: src/lib/sounds.ts

// Sound effect utility for the Kawaii Todo app
class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private enabled: boolean = true;
  
  constructor() {
    // Initialize sounds if we're in the browser
    if (typeof window !== 'undefined') {
      this.sounds = {
        click: new Audio('/sounds/click.mp3'),
        complete: new Audio('/sounds/complete.mp3'),
        add: new Audio('/sounds/add.mp3')
      };
      
      // Set volume for all sounds
      Object.values(this.sounds).forEach(sound => {
        sound.volume = 0.5;
      });
      
      // Check if sounds are enabled in localStorage
      const soundsEnabled = localStorage.getItem('kawaii-sounds-enabled');
      this.enabled = soundsEnabled === null ? true : soundsEnabled === 'true';
    }
  }
  
  play(soundName: 'click' | 'complete' | 'add') {
    if (!this.enabled || typeof window === 'undefined') return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      // Reset the audio to the beginning if it's already playing
      sound.currentTime = 0;
      sound.play().catch(err => {
        // Silently fail - this is likely due to user not interacting with the page yet
        console.log('Sound play error (this is normal before user interaction):', err);
      });
    }
  }
  
  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('kawaii-sounds-enabled', this.enabled.toString());
    }
    return this.enabled;
  }
  
  isEnabled() {
    return this.enabled;
  }
}

// Create a singleton instance
export const soundManager = typeof window !== 'undefined' ? new SoundManager() : null;

// Helper functions
export const playSound = (sound: 'click' | 'complete' | 'add') => {
  soundManager?.play(sound);
};

export const toggleSounds = () => {
  return soundManager?.toggle() ?? false;
};

export const isSoundsEnabled = () => {
  return soundManager?.isEnabled() ?? false;
};