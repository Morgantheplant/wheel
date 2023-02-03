import _render from '../render';

export const SvgBackground = (props, children)=> {
    return <svg 
    version="1.1"
    width={props.width}
    height={props.height}
    >{children}</svg>
}