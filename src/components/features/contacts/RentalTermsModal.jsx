import React from 'react';
import { Modal } from '../../ui/Modal';
import { RENTAL_TERMS } from '../../../data/terms';

export function RentalTermsModal({ isOpen, onClose }) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Rental Terms & Conditions"
      className="max-w-4xl max-h-[85vh]"
    >
      <div className="space-y-12">
        {RENTAL_TERMS.map((term, index) => (
          <div key={index} className="group">
            <h3 className="text-lg md:text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-slate-900 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              {term.title}
            </h3>
            
            <div className="pl-11 space-y-4">
              {term.content && (
                <p className="text-slate-600 leading-relaxed text-[0.95rem] md:text-base">
                  {term.content}
                </p>
              )}
              
              {term.bullets && term.bullets.length > 0 && (
                <ul className="space-y-3">
                  {term.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-600 text-[0.95rem] md:text-base leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-sm" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        <div className="pt-8 border-t border-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm font-medium">By proceeding with a reservation, you agree to these legal conditions.</p>
        </div>
      </div>
    </Modal>
  );
}
