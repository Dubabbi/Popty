import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";
import type { LatLng } from "@/hooks/useGeolocation";
import type { PopupGroup } from "@/components/ui/map/utils/popupGroup";
import { FALLBACK_CENTER } from "@/components/ui/map/constants/mapLocations";

type Props = {
  loc: LatLng | null;
  groups: Record<string, PopupGroup>;
  onClickGroup: (popupIds: string[]) => void;
};

export function NaverMapCanvas({ loc, groups, onClickGroup }: Props) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <MapDiv
        style={{ width: "100%", height: "100%" }}
        fallback={
          <div className="grid h-full place-items-center">지도 로딩 중…</div>
        }
      >
        <NaverMap
          defaultCenter={FALLBACK_CENTER}
          center={loc ?? FALLBACK_CENTER}
          defaultZoom={14}
        >
          {loc && <Marker position={loc} />}

          {Object.entries(groups).map(([areaKey, group]) => (
            <Marker
              key={areaKey}
              position={group.position}
              onClick={() => onClickGroup(group.popupIds)}
            />
          ))}
        </NaverMap>
      </MapDiv>
    </div>
  );
}
