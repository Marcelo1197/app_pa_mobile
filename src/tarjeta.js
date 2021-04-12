const { createElement} = React;
const html = htm.bind(createElement);

class Tarjeta extends React.Component {
    constructor (props) {
        super (props);
            this.state = { tarjeta: this.props.tarjeta }
    }

    render () {
        return html `
            <${Ons.Card}>
                <${Ons.ListItem} className="post-button-bar" modifier="nodivider">
                    <div className="list-item__title">
                        <b>${this.state.tarjeta.titulo}</b>
                    </div>
                <//>
            <//>
        `
    }
}

export default Tarjeta;