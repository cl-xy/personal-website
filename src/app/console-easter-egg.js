'use client';

import { useEffect } from 'react';

export function ConsoleEasterEgg() {
  useEffect(() => {
    console.log('You checked the console. Good instinct. The methodology holds up here too.');
  }, []);

  return null;
}
