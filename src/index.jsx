import React from 'react';
function getElementType(element) {
    if (!React.isValidElement(element)) {
        return null;
    }
    return element.type;
}
/**
 * clone chilrens with passed props to ensure some nested components props works
 * @param children
 * @param props
 * @returns
 */
const childrenWithContext = (children, props = {}) => (<>
        {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }
        return React.cloneElement(child, {
            ...props,
            children: child.props.children,
        });
    })}
    </>);
export class If extends React.PureComponent {
    render() {
        const children = React.Children.toArray(this.props.children);
        let elements;
        if (this.props.condition) {
            // render without content in <ElIf> and <Else>
            elements = children.filter((child) => {
                const type = getElementType(child);
                if (!type) {
                    return child;
                }
                return type !== ElIf && type !== Else;
            });
        }
        else {
            // find <ElIf> with `condition==true`;
            const validElif = children.find((child) => {
                if (!React.isValidElement(child)) {
                    return false;
                }
                return child.type === ElIf && child.props.condition;
            });
            // if not exist valid <ElIf>, find <Else>
            elements = validElif || children.find((child) => {
                if (!React.isValidElement(child)) {
                    return false;
                }
                return child.type === Else;
            });
        }
        return elements
            ? childrenWithContext(elements, { withinIf: true, ...this.props })
            : null;
    }
}
export class ElIf extends React.PureComponent {
    render() {
        if (!this.props.withinIf) {
            // <ElIf> should be a nested child of <If> component
            return null;
        }
        return childrenWithContext(this.props.children, this.props);
    }
}
export class Else extends React.PureComponent {
    render() {
        if (!this.props.withinIf) {
            // <Else> should be a nested child of <If> component
            return null;
        }
        return childrenWithContext(this.props.children, this.props);
    }
}
