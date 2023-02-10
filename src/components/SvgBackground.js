import _render from '_render';

export const SvgBackground = (props, children)=> {
    return <svg 
    version="1.1"
    width={props.width}
    height={props.height}
    style={{background: 'grey'}}
    >{children}</svg>
}