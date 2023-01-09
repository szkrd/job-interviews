import variables from './_variablesExport.scss';

// it would be perfectly fine to just export the "variables" object,
// but since we have no ts def for that, code complete would be missing
const scssVars = {
  colors: {
    aluminium: variables['color-aluminium'],
    aluminiumHighlight: variables['color-aluminium-highlight'],
    aluminiumShadow: variables['color-aluminium-shadow'],
    butter: variables['color-butter'],
    butterHighlight: variables['color-butter-highlight'],
    butterShadow: variables['color-butter-shadow'],
    chameleon: variables['color-chameleon'],
    chameleonHighlight: variables['color-chameleon-highlight'],
    chameleonShadow: variables['color-chameleon-shadow'],
    orange: variables['color-orange'],
    orangeHighlight: variables['color-orange-highlight'],
    orangeShadow: variables['color-orange-shadow'],
    chocolate: variables['color-chocolate'],
    chocolateHighlight: variables['color-chocolate-highlight'],
    chocolateShadow: variables['color-chocolate-shadow'],
    skyBlue: variables['color-sky-blue'],
    skyBlueHighlight: variables['color-sky-blue-highlight'],
    skyBlueShadow: variables['color-sky-blue-shadow'],
    plum: variables['color-plum'],
    plumHighlight: variables['color-plum-highlight'],
    plumShadow: variables['color-plum-shadow'],
    slate: variables['color-slate'],
    slateHighlight: variables['color-slate-highlight'],
    slateShadow: variables['color-slate-shadow'],
    scarletRed: variables['color-scarlet-red'],
    scarletRedHighlight: variables['color-scarlet-red-highlight'],
    scarletRedShadow: variables['color-scarlet-red-shadow'],
    white: variables['color-white'],
    black: variables['color-black'],
  },
};

export default scssVars;
