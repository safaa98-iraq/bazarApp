'use client';

import { useEffect } from 'react';

const REPLACEMENTS: Record<string, string> = {
  '10 منتجات': '75 منتج',
  '10 منتج': '75 منتج',
};

const t = (...codes: number[]) => String.fromCharCode(...codes);
const HIDE_PATTERNS = [
  t(1584,1603,1575,1569,32,1575,1589,1591,1606,1575,1593,1610),
  t(1575,1604,1584,1603,1575,1569,32,1575,1604,1575,1589,1591,1606,1575,1593,1610),
  t(1578,1608,1604,1610,1583,32,1578,1604,1602,1575,1574,1610,32,1576,1575,1604,1584,1603,1575,1569,32,1575,1604,1575,1589,1591,1606,1575,1593,1610),
  t(1578,1608,1604,1610,1583,32,1576,1575,1604,1584,1603,1575,1569,32,1575,1604,1575,1589,1591,1606,1575,1593,1610),
  t(1575,1602,1578,1585,1575,1581,32,1587,1593,1585,32,1576,1575,1604,1584,1603,1575,1569,32,1575,1604,1575,1589,1591,1606,1575,1593,1610),
  t(1603,1578,1575,1576,1577,32,1571,1608,1589,1575,1601,32,1575,1604,1605,1606,1578,1580,1575,1578,32,1576,1575,1604,1584,1603,1575,1569,32,1575,1604,1575,1589,1591,1606,1575,1593,1610),
  t(1575,1602,1578,1585,1575,1581,1575,1578,32,1575,1604,1605,1606,1578,1580,1575,1578,32,1604,1604,1593,1605,1604,1575,1569),
  t(1585,1589,1610,1583,32,1575,1604,1584,1603,1575,1569,32,1575,1604,1575,1589,1591,1606,1575,1593,1610),
  t(65,73),
  t(71,111,111,103,108,101,32,65,100,83,101,110,115,101),
];

function normalizeNodeText(node: Node) {
  if (!node.nodeValue) return;
  let nextValue = node.nodeValue;
  for (const [from, to] of Object.entries(REPLACEMENTS)) {
    nextValue = nextValue.replaceAll(from, to);
  }
  if (nextValue !== node.nodeValue) node.nodeValue = nextValue;
}

function hideElementForNode(node: Node) {
  const text = node.nodeValue ?? '';
  if (!HIDE_PATTERNS.some(pattern => text.includes(pattern))) return;
  const parent = node.parentElement;
  if (!parent) return;
  const target = (parent.closest('tr') ?? parent.closest('button, a, li, div')) as HTMLElement | null;
  if (target && target !== document.body) {
    target.style.display = 'none';
  }
}

function normalizeVisibleText(root: Node = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    normalizeNodeText(node);
    hideElementForNode(node);
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
            hideElementForNode(node);
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
