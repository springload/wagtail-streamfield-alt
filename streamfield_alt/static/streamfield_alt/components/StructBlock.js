import React from 'react'

export class StructBlock extends React.Component {
    renderBlock(value, schema, path) {
        const Component = BLOCK_TYPES_REGISTRY[schema.type];
        return <Component value={value} schema={schema} path={path} />;
    }
    
    render() {
        const fields = [];

        for (let field in this.props.value) {
            const value = this.props.value[field];
            const schema = this.props.schema.child_blocks[field];
            const path = `${this.props.path}-${field}`;

            fields.push(
                <li key={field}>
                    <label for={path}>{schema.label}</label>
                    {renderBlock(this.props.store, value, schema, path)}
                </li>
            );
        }

        return <div className="struct-block">
            <ul className="fields">
                {fields}
            </ul>
        </div>;
    }
}
