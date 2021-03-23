import React from 'react';

/**
 * clone elements child
 * @param {Object} props
 * @returns {React.Component} child with props
 */
interface Props {
    condition?: boolean;
    withinIf?: boolean;
    children?: React.ReactNode
}

function getElementType(element: React.ReactNode) {
    if (!React.isValidElement<Props>(element)) {
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
const childrenWithContext = (children: React.ReactNode, props: Props = {}) => (
    <>
        {
            React.Children.map(children, (child) => {
                if (!React.isValidElement<Props>(child)) {
                    return child;
                }

                return React.cloneElement<Props>(child, {
                    ...props,
                    children: child.props.children,
                });
            })
        }
    </>
);

export class If extends React.PureComponent<Props> {
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
                return type !==  ElIf && type !== Else;
            });
        } else {
            // find <ElIf> with `condition==true`;
            const validElif = children.find((child) => {
                if (!React.isValidElement<Props>(child)) {
                    return false;
                }
                return child.type === ElIf && child.props.condition;
            });
            // if not exist valid <ElIf>, find <Else>
            elements = validElif || children.find((child) => {
                if (!React.isValidElement<Props>(child)) {
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

export class ElIf extends React.PureComponent<Props> {
    render() {
        if (!this.props.withinIf) {
            // <ElIf> should be a nested child of <If> component
            return null;
        }
        return childrenWithContext(this.props.children, this.props);
    }
}

export class Else extends React.PureComponent<Props> {
    render() {
        if (!this.props.withinIf) {
            // <Else> should be a nested child of <If> component
            return null;
        }
        return childrenWithContext(this.props.children, this.props);
    }
}
