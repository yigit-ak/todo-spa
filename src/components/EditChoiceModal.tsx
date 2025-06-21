interface Props {
  onClose(): void;
  onEditOnlyThis(): void;
  onEditAll(): void;
}

export default function EditChoiceModal({ onClose, onEditOnlyThis, onEditAll }: Props) {
  return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <h3>Edit recurrent task</h3>
          <p>Do you want to edit just this occurrence or the whole series?</p>
          <div className="modal-actions">
            <button className="primary" onClick={onEditOnlyThis}>
              This task only
            </button>
            <button className="warning" onClick={onEditAll}>
              Entire series
            </button>
          </div>
        </div>
      </div>
  );
}
