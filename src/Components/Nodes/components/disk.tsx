import { HardDrive } from "lucide-react";
import { type FC, memo } from "react";
import type { DiskUsageItemProps } from "@/Components/DiskUsage/components/types.js";
import type { PollData } from "@/Components/Poll/components/types.js";
import { formatBytes } from "@/Components/Utils/components/format-bytes.js";
import styles from "./disk.module.scss";
import { NodesUsage, NodesUsageLabel, NodesUsageOverview } from "./usage.js";

const Disk: FC<DiskUsageItemProps> = memo(({ id, free, total }) => {
  const used = total - free;
  const percent = total ? Math.round((used / total) * 100) : 0;
  const overview = `${formatBytes(used)} / ${formatBytes(total)}`;
  return (
    <div className={styles.item} key={id}>
      <NodesUsage percent={percent}>
        <NodesUsageLabel>
          <HardDrive />
          {id}
        </NodesUsageLabel>
        <NodesUsageOverview>{overview}</NodesUsageOverview>
      </NodesUsage>
    </div>
  );
});
export const NodesDisk: FC<{ data: PollData["diskUsage"] }> = ({ data }) => {
  const items = data?.items ?? [];
  return (
    <div className={styles.main}>
      {items.map(({ id, free, total }) => (
        <Disk free={free} id={id} key={id} total={total} />
      ))}
    </div>
  );
};
