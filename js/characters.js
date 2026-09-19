// Cute 3D cartoon character definitions
const CHARACTERS = [
  {
    id: 'bunny',
    name: 'Bunny Bob',
    nameZh: '兔兔 Bob',
    emoji: '🐰',
    bodyColor: 0xFFB6C1,
    headColor: 0xFFC0CB,
    accentColor: 0xFF69B4,
    eyeColor: 0x2D2D2D,
    hatColor: 0xFF4757,
    description: 'Fast & friendly!'
  },
  {
    id: 'cat',
    name: 'Catty Cleo',
    nameZh: '貓咪 Cleo',
    emoji: '🐱',
    bodyColor: 0xFFA502,
    headColor: 0xFFBE76,
    accentColor: 0xFF6348,
    eyeColor: 0x27AE60,
    hatColor: 0x6C5CE7,
    description: 'Smart & cool!'
  },
  {
    id: 'bear',
    name: 'Bear Benny',
    nameZh: '熊熊 Benny',
    emoji: '🐻',
    bodyColor: 0xA0522D,
    headColor: 0xCD853F,
    accentColor: 0x8B4513,
    eyeColor: 0x2D2D2D,
    hatColor: 0x00B894,
    description: 'Strong & brave!'
  },
  {
    id: 'panda',
    name: 'Panda Penny',
    nameZh: '熊貓 Penny',
    emoji: '🐼',
    bodyColor: 0xFFFFFF,
    headColor: 0xF5F5F5,
    accentColor: 0x2D2D2D,
    eyeColor: 0x2D2D2D,
    hatColor: 0xFD79A8,
    description: 'Calm & cute!'
  },
  {
    id: 'fox',
    name: 'Fox Finn',
    nameZh: '狐狸 Finn',
    emoji: '🦊',
    bodyColor: 0xFF7F50,
    headColor: 0xFF6347,
    accentColor: 0xFFFFFF,
    eyeColor: 0x2D2D2D,
    hatColor: 0x0984E3,
    description: 'Clever & quick!'
  },
  {
    id: 'robot',
    name: 'Robo Rex',
    nameZh: '機器人 Rex',
    emoji: '🤖',
    bodyColor: 0x74B9FF,
    headColor: 0xA29BFE,
    accentColor: 0xFD79A8,
    eyeColor: 0x00CEC9,
    hatColor: 0xFDCB6E,
    description: 'Tech genius!'
  }
];

function capsuleGeo(radius, length, capSegs, radSegs) {
  if (typeof THREE.CapsuleGeometry === 'function') {
    return new THREE.CapsuleGeometry(radius, length, capSegs || 8, radSegs || 16);
  }
  return new THREE.CylinderGeometry(radius, radius, length + radius * 2, radSegs || 16);
}

function buildCharacter(scene, charData) {
  const group = new THREE.Group();

  // Body
  const bodyGeo = capsuleGeo(0.5, 0.8, 8, 16);
  const bodyMat = new THREE.MeshToonMaterial({ color: charData.bodyColor });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.6;
  body.castShadow = true;
  group.add(body);

  // Head
  const headGeo = new THREE.SphereGeometry(0.55, 16, 16);
  const headMat = new THREE.MeshToonMaterial({ color: charData.headColor });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 1.5;
  head.castShadow = true;
  group.add(head);

  // Eyes
  [-0.18, 0.18].forEach(x => {
    const eyeWhite = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshToonMaterial({ color: 0xFFFFFF })
    );
    eyeWhite.position.set(x, 1.55, 0.42);
    group.add(eyeWhite);

    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      new THREE.MeshToonMaterial({ color: charData.eyeColor })
    );
    pupil.position.set(x, 1.53, 0.5);
    group.add(pupil);

    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    );
    shine.position.set(x + 0.03, 1.57, 0.54);
    group.add(shine);
  });

  // Cheeks
  [-0.32, 0.32].forEach(x => {
    const cheek = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshToonMaterial({ color: 0xFFB6C1, transparent: true, opacity: 0.6 })
    );
    cheek.position.set(x, 1.4, 0.38);
    group.add(cheek);
  });

  // Hat
  const hatBrim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.45, 0.06, 16),
    new THREE.MeshToonMaterial({ color: charData.hatColor })
  );
  hatBrim.position.y = 2.05;
  group.add(hatBrim);

  const hatTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.35, 0.35, 16),
    new THREE.MeshToonMaterial({ color: charData.hatColor })
  );
  hatTop.position.y = 2.25;
  group.add(hatTop);

  // Arms
  [-0.65, 0.65].forEach(x => {
    const arm = new THREE.Mesh(
      capsuleGeo(0.12, 0.4, 4, 8),
      new THREE.MeshToonMaterial({ color: charData.bodyColor })
    );
    arm.position.set(x, 0.85, 0);
    arm.rotation.z = x > 0 ? -0.4 : 0.4;
    arm.castShadow = true;
    group.add(arm);
  });

  // Legs
  [-0.22, 0.22].forEach(x => {
    const leg = new THREE.Mesh(
      capsuleGeo(0.14, 0.35, 4, 8),
      new THREE.MeshToonMaterial({ color: charData.accentColor })
    );
    leg.position.set(x, 0.15, 0);
    leg.castShadow = true;
    group.add(leg);
  });

  // Character-specific ears
  if (charData.id === 'bunny') {
    [-0.2, 0.2].forEach(x => {
      const ear = new THREE.Mesh(
        capsuleGeo(0.08, 0.4, 4, 8),
        new THREE.MeshToonMaterial({ color: charData.headColor })
      );
      ear.position.set(x, 2.1, -0.05);
      ear.rotation.z = x > 0 ? 0.2 : -0.2;
      group.add(ear);
    });
  } else if (charData.id === 'cat' || charData.id === 'fox') {
    [-0.25, 0.25].forEach(x => {
      const ear = new THREE.Mesh(
        new THREE.ConeGeometry(0.15, 0.3, 4),
        new THREE.MeshToonMaterial({ color: charData.headColor })
      );
      ear.position.set(x, 2.0, 0);
      group.add(ear);
    });
  } else if (charData.id === 'bear') {
    [-0.4, 0.4].forEach(x => {
      const ear = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshToonMaterial({ color: charData.headColor })
      );
      ear.position.set(x, 1.95, 0);
      group.add(ear);
    });
  } else if (charData.id === 'panda') {
    [-0.35, 0.35].forEach(x => {
      const patch = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 8, 8),
        new THREE.MeshToonMaterial({ color: 0x2D2D2D })
      );
      patch.position.set(x, 1.5, 0.35);
      group.add(patch);
    });
    [-0.4, 0.4].forEach(x => {
      const ear = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 8, 8),
        new THREE.MeshToonMaterial({ color: 0x2D2D2D })
      );
      ear.position.set(x, 1.95, 0);
      group.add(ear);
    });
  } else if (charData.id === 'robot') {
    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
      new THREE.MeshToonMaterial({ color: 0xFFD700 })
    );
    antenna.position.y = 2.5;
    group.add(antenna);
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xFF0000 })
    );
    ball.position.y = 2.68;
    group.add(ball);
  }

  return group;
}

function getCharacterById(id) {
  return CHARACTERS.find(c => c.id === id) || CHARACTERS[0];
}
