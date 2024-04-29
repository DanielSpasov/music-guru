import React from 'react';

import { Form, Icon, Input, Textarea } from '../../../Components';
import { VerseSchema } from '../helpers';
import { toast } from 'react-toastify';
import Api from '../../../Api';

export const wrapperLightProps = 'border-neutral-200 border-[1px]';
export const wrapperDarkProps = 'dark:border-none dark:bg-neutral-900';
export const wrapperProps = `${wrapperLightProps} ${wrapperDarkProps}`;

export default function AddVerse({
  uid,
  onClose
}: {
  uid: string;
  onClose: () => void;
}) {
  return (
    <div className={`mt-4 rounded-md ${wrapperProps}`}>
      <div className="flex justify-between pt-3 px-3">
        <h3>New Verse</h3>
        <Icon model="close" onClick={onClose} className="w-8 right-0" />
      </div>

      <Form
        showClose={false}
        onSubmit={async formValues => {
          try {
            await Api.songs.addVerse({ uid, payload: formValues });
            toast.success('Verse added sucessfully');
            onClose();
          } catch (err) {
            toast.error('Failed to add Verse');
          }
        }}
        validationSchema={VerseSchema}
        schema={[
          {
            key: 'verse',
            foldable: false,
            fields: [
              {
                key: 'title',
                label: 'Title',
                Component: Input,
                validations: {
                  required: {
                    value: true,
                    message: 'Title is required.'
                  }
                }
              },
              {
                key: 'lyrics',
                label: 'Lyrics',
                Component: Textarea,
                validations: {
                  required: {
                    value: true,
                    message: 'Lyrics are required.'
                  }
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}
