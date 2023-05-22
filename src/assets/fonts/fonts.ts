import MontserratLight from './Montserrat-Arabic-Light.woff2';
import MontserratMedium from './Montserrat-Arabic-Medium.woff2';
import MontserratRegular from './Montserrat-Arabic-Regular.woff2';
import MontserratSemiBold from './Montserrat-Arabic-SemiBold.woff2';

const light = {
    fontFamily: 'Monserrat Arabic',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 300,
    src: `
    local('Montserrat-Arabic'),
    local('Montserrat-Arabic-Light'),
    url(${MontserratLight}) format('woff2')
  `,
};
const regular = {
    fontFamily: 'Monserrat Arabic',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
    local('Montserrat-Arabic'),
    local('Montserrat-Arabic-Regular'),
    url(${MontserratRegular}) format('woff2')
  `,
};
const medium = {
    fontFamily: 'Monserrat Arabic',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 500,
    src: `
    local('Montserrat-Arabic'),
    local('Montserrat-Arabic-Medium'),
    url(${MontserratMedium}) format('woff2')
  `,
};
const semibold = {
    fontFamily: 'Monserrat Arabic',
    fontStyle: 'semibold',
    fontDisplay: 'swap',
    fontWeight: 600,
    src: `
    local('Montserrat-Arabic'),
    local('Montserrat-Arabic-SemiBold'),
    url(${MontserratSemiBold}) format('woff2')
  `,
};

export { light, medium, regular, semibold };
