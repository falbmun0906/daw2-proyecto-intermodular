import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string | number;
}

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId: string = '';
  @Output() tabChanged = new EventEmitter<string>();

  selectTab(tabId: string, disabled?: boolean): void {
    if (disabled) {
      return;
    }

    this.activeTabId = tabId;
    this.tabChanged.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTabId === tabId;
  }
}
