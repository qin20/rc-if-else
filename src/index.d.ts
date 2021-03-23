import React from 'react';
/**
 * clone elements child
 * @param {Object} props
 * @returns {React.Component} child with props
 */
interface Props {
    condition?: boolean;
    withinIf?: boolean;
    children?: React.ReactNode;
}
export declare class If extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export declare class ElIf extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export declare class Else extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
