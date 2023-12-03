export default function expandToContainer(
  target: HTMLElement,
  container: HTMLElement
) {
  const targetRect = target.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const newWidth = containerRect.width - (targetRect.left - containerRect.left);
  const newHeight = containerRect.height - (targetRect.top - containerRect.top);
  const scale = Math.min(
    newWidth / targetRect.width,
    newHeight / targetRect.height
  );

  target.style.transform = `scale(${scale})`;
}
