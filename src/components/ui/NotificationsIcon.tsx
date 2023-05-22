interface props {
    fill: string;
    width?: string;
    height?: string;
}

function NotificationsIcon({ fill, width, height }: props) {
    return (
        <svg
            id="Notifications"
            width={width || '25.979998'}
            height={height || '31.191002'}
            viewBox="0 0 25.979998 31.191002"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                cursor: 'pointer',
            }}
        >
            <defs id="defs6">
                <clipPath id="clip-path">
                    <rect
                        id="icon_1_container"
                        data-name="icon 1 container"
                        width="56"
                        height="56"
                        rx="21"
                        transform="translate(200,157.5)"
                        fill="#e2e2e2"
                        x="0"
                        y="0"
                    />
                </clipPath>
                <clipPath id="clip-path-2">
                    <rect
                        id="Rectangle_179"
                        data-name="Rectangle 179"
                        width="25.98"
                        height="31.191"
                        fill="none"
                        x="0"
                        y="0"
                    />
                </clipPath>
            </defs>
            <g
                id="Mask_Group_7"
                data-name="Mask Group 7"
                transform="translate(-215.01,-169.905)"
                clipPath="url(#clip-path)"
            >
                <g
                    id="Group_142"
                    data-name="Group 142"
                    transform="translate(215.01,169.905)"
                >
                    <g
                        id="Group_141"
                        data-name="Group 141"
                        clipPath="url(#clip-path-2)"
                    >
                        <path
                            id="Path_39"
                            data-name="Path 39"
                            d="m 17.754,27.315 a 4.319,4.319 0 0 1 -0.656,1.616 4.812,4.812 0 0 1 -3.417,2.208 0.691,0.691 0 0 0 -0.139,0.052 h -1.1 A 12.474,12.474 0 0 1 10.676,30.58 4.692,4.692 0 0 1 8.251,27.458 1.031,1.031 0 0 1 8.236,27.315 Z"
                            fill={fill}
                        />
                        <path
                            id="Path_40"
                            data-name="Path 40"
                            d="m 23.623,26 c -1.371,0.009 -2.741,0 -4.112,0 H 12.993 Q 7.71,26 2.424,26 A 2.265,2.265 0 0 1 0.06,24.208 2.232,2.232 0 0 1 0.869,21.922 8.688,8.688 0 0 0 2.708,19.707 8.792,8.792 0 0 0 3.9,15.2 c 0,-1.259 -0.014,-2.518 0.01,-3.776 a 9.078,9.078 0 0 1 7.5,-8.673 c 0.234,-0.039 0.306,-0.116 0.3,-0.344 -0.017,-0.386 -0.013,-0.773 0,-1.158 a 1.29,1.29 0 0 1 2.579,0 c 0.014,0.405 0.011,0.812 0,1.218 0,0.179 0.06,0.241 0.236,0.272 a 9.077,9.077 0 0 1 7.469,7.624 10.971,10.971 0 0 1 0.093,1.518 c 0.023,1.369 -0.031,2.743 0.055,4.109 a 8.321,8.321 0 0 0 2.873,5.822 2.5,2.5 0 0 1 0.961,1.667 A 2.265,2.265 0 0 1 23.623,26"
                            fill={fill}
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default NotificationsIcon;
