import { screen, render, fireEvent } from '@testing-library/react';
import { FC } from 'react';

import { SVGProps } from '../../../../Common/SVG/helpers';
import { ButtonAction, IconAction } from '../../types';
import { SVG } from '../../../../Common';
import Header from '.';

const MockIcon: FC<SVGProps> = props => <SVG {...props} />;

describe('Header', () => {
  const btnActions: ButtonAction[] = [
    {
      type: 'button',
      onClick: vi.fn(),
      variant: 'outline',
      children: <span>test</span>
    },
    {
      type: 'button',
      onClick: vi.fn(),
      variant: 'outline',
      children: <span>test</span>,
      disabled: true
    },
    {
      type: 'button',
      onClick: vi.fn(),
      variant: 'outline',
      children: <span>test</span>,
      hidden: true
    }
  ];
  const iconActions: IconAction[] = [
    {
      type: 'icon',
      Icon: MockIcon,
      onClick: vi.fn()
    },
    {
      type: 'icon',
      Icon: MockIcon,
      onClick: vi.fn(),
      disabled: true
    },
    {
      type: 'icon',
      Icon: MockIcon,
      onClick: vi.fn(),
      hidden: true
    }
  ];

  test('renders without crashing', () => {
    render(<Header />);

    const headerEl = screen.getByTestId('header');
    expect(headerEl).toBeInTheDocument();

    const headingEl = screen.queryByTestId('header-heading');
    expect(headingEl).not.toBeInTheDocument();

    const actionsEl = screen.getByTestId('header-actions');
    expect(actionsEl.children.length).toEqual(0);
  });

  test('renders with additional props', () => {
    const heading = 'Test Heading';
    render(
      <Header heading={heading} actions={[...btnActions, ...iconActions]} />
    );

    const headerEl = screen.getByTestId('header');
    expect(headerEl).toBeInTheDocument();

    const headingEl = screen.getByTestId('header-heading');
    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(heading);

    const actionsEl = screen.getByTestId('header-actions');
    expect(actionsEl.children.length).toEqual(4);
  });

  test('renders correct button actions', () => {
    render(<Header actions={btnActions} />);

    const headerEl = screen.getByTestId('header');
    expect(headerEl).toBeInTheDocument();

    const actionsEl = screen.getByTestId('header-actions');
    expect(actionsEl.children.length).toEqual(2);

    const actionOneEl = screen.getByTestId('header-actions-0');
    expect(actionOneEl).toBeInTheDocument();
    fireEvent.click(actionOneEl);
    expect(btnActions[0].onClick).toBeCalled();

    const actionTwoEl = screen.getByTestId('header-actions-1');
    expect(actionTwoEl).toBeInTheDocument();
    fireEvent.click(actionTwoEl);
    expect(btnActions[1].onClick).not.toBeCalled();

    const actionThreeEl = screen.queryByTestId('header-actions-2');
    expect(actionThreeEl).not.toBeInTheDocument();
  });

  test('renders correct icon actions', () => {
    render(<Header actions={iconActions} />);

    const headerEl = screen.getByTestId('header');
    expect(headerEl).toBeInTheDocument();

    const actionsEl = screen.getByTestId('header-actions');
    expect(actionsEl.children.length).toEqual(2);

    const actionOneEl = screen.getByTestId('header-actions-0');
    expect(actionOneEl).toBeInTheDocument();
    fireEvent.click(actionOneEl);
    expect(iconActions[0].onClick).toBeCalled();

    const actionTwoEl = screen.getByTestId('header-actions-1');
    expect(actionTwoEl).toBeInTheDocument();
    fireEvent.click(actionTwoEl);
    expect(iconActions[1].onClick).not.toBeCalled();

    const actionThreeEl = screen.queryByTestId('header-actions-2');
    expect(actionThreeEl).not.toBeInTheDocument();
  });
});
