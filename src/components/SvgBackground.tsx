import _render from 'packages/render';
import { Children } from 'packages/render/types';

export const SvgBackground = (props: {width: number, height: number, children: Children})=> {
    return <svg 
    version="1.1"
    width={props.width}
    height={props.height}
    style={{background: 'grey'}}
    >{props.children}</svg>
}