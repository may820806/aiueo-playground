import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import styles from '../styles/PeekTonesTableDialog.module.scss';
import { fiftyTone } from "../application/fiftyTone";

interface Props {
  visible: boolean;
  onHideDialog: () => void;
}

const PeekTonesTableDialog: React.FC<Props> = ({visible, onHideDialog}) => {

  const ContactDialogHeader = () => {
    return (
      <h2>All Tones</h2>
    )
  }

  return (
    <React.Fragment>
      <Dialog
        header={ContactDialogHeader}
        visible={visible}
        className={styles['peek-tones-dialog']}
        onHide={onHideDialog}
      >
        <div className={styles['peek-tones-table']}>
          {
            fiftyTone.map((tone, index) => {
              return (
                <div key={index}>
                  <p>
                    {tone.hiragana} / {tone.katakana}
                    <br />
                    {tone.pronounce}
                  </p>
                </div>
              )
            })
          }
        </div>
      </Dialog>
    </React.Fragment>
  )
}

export default PeekTonesTableDialog;