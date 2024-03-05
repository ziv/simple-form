export const size = () => ({
  value: 0,
  unit: 'px'
});

export const border = () => ({
  width: size(),
  type: 'solid',
  color: '#000000',
  radius: size()
});

export const borders = () => ({
  locked: false,
  top: border(),
  right: border(),
  left: border(),
  bottom: border(),
});
