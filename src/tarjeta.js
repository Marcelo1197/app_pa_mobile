const { createElement} = React;
const html = htm.bind(createElement);

class Tarjeta extends React.Component {
    constructor (props) {
        super (props);
            this.state = { texto: this.props.texto }
    }

    render () {
        return html `
            <${Ons.Card}>
                <${Ons.ListItem} className="post-button-bar" modifier="nodivider">
                    <div className="list-item__title">
                        <b>${this.state.texto.texto}</b>
                    </div>
                <//>
            <//>
        `
    }
}

export default Tarjeta;