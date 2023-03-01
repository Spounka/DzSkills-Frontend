import React from 'react'

function SvgIcon({ icon, ...other }: any) {
    return <img src={icon} alt="" {...other} />
}

export default SvgIcon;