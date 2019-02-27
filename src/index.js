import React from 'react';

/**
 * clone elements child
 * @param {Object} props
 * @returns {ReactElement} child with props
 */
const cloneChildrenWithProps = (children, props) => {
    var { condition, withinIf, ...newProps } = props;
    return (
        <React.Fragment>{
            React.Children.map(children, child => {
                if (typeof child === 'string') {
                    return child;
                }
                if (child.type  === ElIf || child.type === Else) {
                    return React.cloneElement(child, { withinIf, ...props }, child.props.children);
                }
                return React.cloneElement(child, newProps, child.props.children);
            })
        }</React.Fragment>
    );
};

export class If extends React.Component {
    render() {
        const children = React.Children.toArray(this.props.children);
        let conditionalRendering;
        if (this.props.condition) {
            // render without <ElIf> and <Else>
            conditionalRendering = children.filter(child => child.type !== ElIf && child.type !== Else);
        } else {
            // find <ElIf> with `condition==true`;
            const validElif = children.find(child => child.type === ElIf && child.props.condition);
            // if not exist valid <ElIf>, find <Else>
            conditionalRendering = validElif || children.find(child => child.type === Else);
        }
        return conditionalRendering ? cloneChildrenWithProps(conditionalRendering, { withinIf: true, ...this.props }) : null;
    }
}

export class ElIf extends React.Component {
    render() {
        if (!this.props.withinIf) {
            // <ElIf> should be a nested child of <If> component
            return null;
        }
        return cloneChildrenWithProps(this.props.children, this.props);
    }
}

export class Else extends React.Component {
    render() {
        if (!this.props.withinIf) {
            // <Else> should be a nested child of <If> component
            return null;
        }
        return cloneChildrenWithProps(this.props.children, this.props);
    }
}
