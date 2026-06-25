'use client';

import { useEffect } from 'react';

const REPLACEMENTS: Record<string, string> = {
  '10 منتجات': '75 منتج',
  '10 منتج': '75 منتج',
};

function normalizeNodeText(node: Node) {
  if (!node.nodeValue) return;
  let nextValue = node.nodeValue;
  for (const [from, to] of Object.entries(REPLACEMENTS)) {
    nextValue = nextValue.replaceAll(from, to);
  }
  if (nextValue !== node.nodeValue) node.nodeValue = nextValue;
}

function normalizeVisibleText(root: Node = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    normalizeNodeText(node);
    node = walker.nextNode();
  }
}

export function FreePlanTextNormalizer() {
  useEffect(() => {
    normalizeVisibleText();

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            normalizeNodeText(node);
          } else if (node instanceof HTMLElement) {
            normalizeVisibleText(node);
          }
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
