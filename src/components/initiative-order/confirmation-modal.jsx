import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { INITIATIVE_PAGE } from '../../helpers/language-map'
import { resetInitiative } from '../../store'
import I18N from '../I18N/i18n'

class ConfirmationModal extends Component {
    static propTypes = {
        resetInitiative: PropTypes.func,
        resetInitiativeGroup: PropTypes.string,
        setResetInitiativeGroup: PropTypes.func,
        setShowConfirmationModal: PropTypes.func,
        showConfirmationModal: PropTypes.bool
    }

    render() {
        const { resetInitiative, resetInitiativeGroup, setShowConfirmationModal, setResetInitiativeGroup, showConfirmationModal } = this.props

        return (
            <Modal
                enforceFocus
                onHide={ () => setShowConfirmationModal(false) }
                show={ showConfirmationModal }
                size="md"
            >
                <Modal.Header>
                    <Modal.Title>
                        { /*{ `Reset all ${ resetInitiativeGroup || '' } initiative values${ !resetInitiativeGroup ? ' and remove all NPCs' : '' }?` }*/ }
                        <I18N name="initiativeOrder.confirmationModal.header" initiativeGroup={ resetInitiativeGroup } />
                        { !resetInitiativeGroup && <I18N name="initiativeOrder.confirmationModal.header2" /> }
                        <I18N name="initiativeOrder.confirmationModal.header3" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="confirmation-modal__modal-body">
                    <Button
                        onClick={ async () => {
                            await resetInitiative(resetInitiativeGroup)
                            setShowConfirmationModal(false)
                        } }
                        variant="danger"
                    >
                        { INITIATIVE_PAGE.yes }
                    </Button>
                    <Button
                        onClick={ () => {
                            setResetInitiativeGroup(null)
                            setShowConfirmationModal(false)
                        } }
                    >
                        { INITIATIVE_PAGE.nevermind }
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null, { resetInitiative })(ConfirmationModal)
