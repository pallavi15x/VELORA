import { useReducer, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Toast() {
  const { toasts, dispatch } = useContext(AppContext);
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast${t.variant === 'pink' ? ' variant-pink' : t.variant === 'muted' ? ' variant-muted' : ''}`}>
          <span>{t.message}</span>
          <button className="toast-close" onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: t.id })}>✕</button>
        </div>
      ))}
    </div>
  );
}
