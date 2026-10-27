import AsyncStorage from '@react-native-async-storage/async-storage';

export type MotorMode = 'Gentle' | 'Dynamic' | 'Random';
export type LightMode = 'Constant' | 'Breathing' | 'Heartbeat';

export type DevicePreset = {
  speed: number;
  interval: number;
  motorMode: MotorMode;
  lightMode: LightMode;
  savedAt: string;
};

const PRESET_KEY = '@visiobal/devicePreset/v1';

/** Saves the user's default training setup on this phone. */
export async function saveDevicePreset(preset: Omit<DevicePreset, 'savedAt'>): Promise<void> {
  const stored: DevicePreset = { ...preset, savedAt: new Date().toISOString() };
  await AsyncStorage.setItem(PRESET_KEY, JSON.stringify(stored));
}

/** Returns the locally saved setup, or null when the user has not saved one yet. */
export async function loadDevicePreset(): Promise<DevicePreset | null> {
  const raw = await AsyncStorage.getItem(PRESET_KEY);
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as Partial<DevicePreset>;
    const motorModes: MotorMode[] = ['Gentle', 'Dynamic', 'Random'];
    const lightModes: LightMode[] = ['Constant', 'Breathing', 'Heartbeat'];

    if (
      typeof value.speed !== 'number' || typeof value.interval !== 'number' ||
      !motorModes.includes(value.motorMode as MotorMode) || !lightModes.includes(value.lightMode as LightMode)
    ) return null;

    return {
      speed: value.speed,
      interval: value.interval,
      motorMode: value.motorMode as MotorMode,
      lightMode: value.lightMode as LightMode,
      savedAt: typeof value.savedAt === 'string' ? value.savedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function clearDevicePreset(): Promise<void> {
  await AsyncStorage.removeItem(PRESET_KEY);
}
