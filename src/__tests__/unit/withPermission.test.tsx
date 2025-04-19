import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as useAppSelectorModule from '@/hooks/useAppSelector.ts';
import withPermission from '@/hoc/withPermission.tsx';

const DummyComponent = () => <div data-testid="dummy">Secret Content</div>;

describe('withPermission HOC', () => {
  const Wrapped = withPermission('VIEW_SECRET')(DummyComponent);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders component if permission is present', () => {
    vi.spyOn(useAppSelectorModule, 'useAppSelector').mockReturnValue(['VIEW_SECRET']);

    render(<Wrapped />);
    expect(screen.getByTestId('dummy')).toBeInTheDocument();
  });

  it('returns null if permission is missing', () => {
    vi.spyOn(useAppSelectorModule, 'useAppSelector').mockReturnValue(['EDIT_USER']);

    const { container } = render(<Wrapped />);
    expect(container.firstChild).toBeNull();
  });
});
