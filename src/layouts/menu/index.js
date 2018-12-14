export const menuItens = [
  {
    label: 'Fichas de Negociação',
    icon: 'business_center'
  },
  {
    label: 'Satisfied customers',
    avatar: 'statics/boy-avatar.png',
    children: [
      {
        label: 'Good food',
        icon: 'restaurant_menu',
        children: [
          {label: 'Quality ingredients'},
          {label: 'Good recipe'}
        ]
      },
      {
        label: 'Good service',
        icon: 'room_service',
        children: [
          {label: 'Prompt attention'},
          {label: 'Professional waiter'}
        ]
      },
      {
        label: 'Pleasant surroundings',
        icon: 'photo',
        children: [
          {
            label: 'Happy atmosphere',
            img: 'statics/parallax1.jpg'
          },
          {
            label: 'Good table presentation',
            img: 'statics/parallax2.jpg'
          },
          {
            label: 'Pleasing decor',
            img: 'statics/mountains.jpg'
          }
        ]
      }
    ]
  }
]
