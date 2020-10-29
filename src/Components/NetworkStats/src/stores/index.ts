import conf from '@/Helper/src/components/conf'
import { computed, configure, makeObservable } from 'mobx'
import FetchStore from '@/Fetch/src/stores'

configure({
  enforceActions: 'observed',
})

export interface NetworkStatsItemProps {
  id: string
  rx: number
  tx: number
}

class Store {
  public readonly ID = 'networkStats'
  public readonly conf = conf?.[this.ID]
  public readonly enabled: boolean = !!this.conf

  public constructor() {
    makeObservable(this)
  }

  @computed
  public get items(): NetworkStatsItemProps[] {
    return (
      (FetchStore.isLoading
        ? this.conf?.networks
        : FetchStore.data?.[this.ID]?.networks) || []
    )
  }

  @computed
  public get sortItems() {
    return this.items
      .slice()
      .filter(({ tx }) => !!tx)
      .sort((a, b) => a.tx - b.tx)
  }

  @computed
  public get itemsCount() {
    return this.sortItems.length
  }

  @computed
  public get timestamp(): number {
    return (
      (FetchStore.isLoading
        ? this.conf?.timestamp
        : FetchStore.data?.[this.ID]?.timestamp) ||
      this.conf?.timestamp ||
      0
    )
  }
}

const NetworkStatsStore = new Store()

export default NetworkStatsStore
