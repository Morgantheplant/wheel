import _render from 'packages/render';
import { Children } from 'packages/render/types';
import { CSSProperties } from 'react';

export const SvgBackground = (props: {width: number, height: number, style?: CSSProperties, children: Children})=> {
    return <svg 
    style={props.style}
    version="1.1"
    width={props.width}
    height={props.height}
    >{props.children}</svg>
}